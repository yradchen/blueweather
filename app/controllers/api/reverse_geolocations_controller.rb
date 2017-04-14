class Api::ReverseGeolocationsController < ApplicationController

  def show
    lat = params[:location][:lat]
    lng = params[:location][:lng]
    address = "https://maps.googleapis.com/maps/api/geocode/json?latlng=#{lat},#{lng}&key=#{ENV["GOOGLE"]}"
    begin
      response = RestClient.get(address)
    rescue => e
      return render json: [e.response], status: e.http_code
    end
    render json: response.body
  end

end
