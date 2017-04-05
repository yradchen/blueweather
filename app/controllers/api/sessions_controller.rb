class Api::SessionsController < ApplicationController

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      login_user(@user)
      render 'api/users/show'
    else
      render json: ["Invalid Credentials"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
    else
      render json: ['Nobody signed in'], status: 404
    end
  end


end
