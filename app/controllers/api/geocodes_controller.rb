class Api::GeocodesController < ApplicationController
  def show
    address = params[:address][:address].split(" ").join("+")
    address = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{ENV["GOOGLE"]}"
    begin
      response = RestClient.get(address)
    rescue => e
      return render json: [e.response], status: e.http_code
    end
    results = JSON.parse(response)["results"][0]
    if results
      render json: response.body
    else
      render json: ["Location not found"], status: 422
    end
  end
end
