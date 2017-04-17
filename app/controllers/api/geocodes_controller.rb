class Api::GeocodesController < ApplicationController
  def show
    address = params[:address][:address].split(" ").join("+")
    address = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{ENV["GOOGLE"]}"
    begin
      response = RestClient.get(address)
    rescue => e
      return render json: ["Failed to connect to google's geolocation services. Check your connection and try again."], status: 443
    end
    results = JSON.parse(response)["results"][0]
    if results
      render json: response.body
    else
      render json: ["Location not found"], status: 422
    end
  end
end
