class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(session_params[:email],
                                    session_params[:password])

    if @user
       sign_in(@user)
       render :json =>  { token: @user.session_token, message: "session created"}, status: 200
    else
        errors = {
            full_messages: "Unable to create session with params: #{params}"
        }
       puts "#{errors[:full_messages]}"
       render json: { errors: errors[:full_messages] }, status: 422
    end
  end

  def destroy
    sign_out
    render json: {message: "signed out"}, status: 200
  end

  def guest
    guest_user = User.find(1)
    sign_in(guest_user)
    redirect_to root_url
  end

  private

  def session_params
      puts "params: #{params}"
      params.require(:session).permit(:email, :password)
  end

end
