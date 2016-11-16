class SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(session_params[:email],
                                        session_params[:password])
        if @user
           sign_in(@user)
           render :json =>  { token: @user.session_token, message: 'session created'}, status: 200
        else
            errors = {
                full_messages: "Unable tconto create session with params: #{params}"
            }
           puts "#{errors[:full_messages]}"
           render json: { errors: errors[:full_messages] }, status: 422
        end
    end

    def destroy
        if sign_out
            render json: {message: 'signed out'}, status: 200
        else
            render json: {message: 'could not sign out'}, status: :bad_request
        end
    end

    def guest
        guest_user = User.find(1)
        sign_in(guest_user)
        redirect_to root_url
    end

    private

    def session_params
        logger.info "Session parameters are: #{params}"
        params.require(:user).permit(:email, :password)
    end

end
