require 'rest-client'

class Api::WeathersController < ApplicationController

  def show
    lat = params[:weather][:lat]
    long = params[:weather][:long]
    date = params[:weather][:date]
    base_url = "https://api.darksky.net/forecast/"
    begin
      response = RestClient.get("#{base_url}#{ENV["DARK_SKY"]}/#{lat},#{long}")
    rescue => e
      return render json: [e.response], status: e.http_code
    end


    render json: response.body
  end


  # private
  # def weather_params
  #   params.require(:weather).permit(:lat, :long, :date)
  # end

end
