require 'rest-client'

class Api::WeathersController < ApplicationController

  def show
    lat = params["geocode"]["lat"]
    lng = params["geocode"]["lng"]
    date = params["geocode"]["date"]
    if date
      date = ",#{date}"
    end
    base_url = "https://api.darksky.net/forecast/"
    begin
      response = RestClient.get("#{base_url}#{ENV["DARK_SKY"]}/#{lat},#{lng}#{date}")
    rescue => e
      return render json: [e.response], status: e.http_code
    end
    render json: [response.body, params["geocode"]["address"], params["geocode"]["date"]]
  end

end
