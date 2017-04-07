require 'rest-client'

class Api::WeathersController < ApplicationController

  def show
    address = params[:address].split(" ").join("+")
    # debugger
    # date = params[:address][:date]
    address = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{ENV["GOOGLE"]}"
    begin
      response = RestClient.get(address)
    rescue => e
      return render json: [e.response], status: e.http_code
    end
    google_response = JSON.parse(response.body)
    google_response = google_response["results"][0]
    formatted_address = google_response["formatted_address"]
    lat = google_response["geometry"]["location"]["lat"]
    long = google_response["geometry"]["location"]["lng"]

    date = nil
    if date
      date = ",#{date}"
    end
    base_url = "https://api.darksky.net/forecast/"
    begin
      response = RestClient.get("#{base_url}#{ENV["DARK_SKY"]}/#{lat},#{long}#{date}")
    rescue => e
      return render json: [e.response], status: e.http_code
    end

    response.body[-1] = "{\"location\":#{formatted_address}}"
    render json: [response.body, formatted_address]
  end


  # private
  # def weather_params
  #   params.require(:weather).permit(:lat, :long, :date)
  # end

end
