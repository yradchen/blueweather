@searches.each do |search|
  json.set! search.id do
    json.extract! search, :lat, :long, :location, :created_at
  end
end
