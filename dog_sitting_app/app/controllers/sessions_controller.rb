class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(session_params[:email],
                                    session_params[:password])

    if @user
      sign_in(@user)
      redirect_to root_url
    else
      @user = User.new(user_params)
      flash[:errors] = ['Invalid username/password']
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end


  def session_params
    params.require(:user).permit(:email, :password)
  end

end
