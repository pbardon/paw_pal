class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    puts "user is #{@user.inspect}"
    result = @user.save
    puts "save results: #{result.inspect}"
    if result
        sign_in(@user)
        render json: { user: { email: @user.email }}, status: :ok
    else
        puts "save was unsuccessful"
        flash[:errors] = @user.errors.full_messages
        render json: { error: "unable to create user with errors : #{flash[:errors]}"}, status: :bad_request
    end
  end

  def update
      @user = User.find_and_update(current_user.session_token, user_params)
      if @user
        render json: { message: "updated user #{user.inspect}"}
      else
        flash[:errors] =  @user.errors.full_messages
      end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :street_address, :city, :state, :zipcode)
  end

end
