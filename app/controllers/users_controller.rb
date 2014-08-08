class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
    end
  end

  def update
    @user = User.find_by_session_token(current_user.session_token)
    if @user.update_attributes(user_params)
      @user.save!
    else
      flash[:errors] =  @user.errors.full_messages
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :street_address, :city, :state, :zipcode)
  end

end
