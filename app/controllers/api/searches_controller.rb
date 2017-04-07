class Api::SearchesController < ApplicationController
  def create
    @search = Search.new(search_params)
    @search.user_id = current_user.id
    debugger
    if @search.save
      render 'api/searches/show'
    else
      render json: @search.errors.full_messages, status: 422
    end
  end

  private
  def search_params
    params.require(:search).permit(:lat, :long, :location)
  end
end
