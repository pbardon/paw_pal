class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


    after_filter :set_csrf_cookie_for_ng

    def set_csrf_cookie_for_ng
      cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end

    helper_method :signed_in?, :current_user

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def signed_in?
        !!current_user
    end

    def sign_in(user)
        user ||= User.find_by_credentials(user.email, user.password)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def sign_out
      if current_user
          current_user.reset_session_token!
          session[:session_token] = nil
          true
      else
          logger.info 'could not sign out because there is not current user'
          false
      end
    end

    def ensure_signed_in!
        redirect_to new_session_url unless signed_in?
    end

    protected

    def verified_request?
        super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end

end
