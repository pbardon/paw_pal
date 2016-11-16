json.(shelter, :id, :user_id, :avg_rating, :shelter_name,
     :description, :price, :small, :medium, :large, :street_address,
     :city, :zipcode, :state, :latitude, :longitude)

json.shelter_photo_small(shelter.shelter_photo.url:small)

json.shelter_photo_large(shelter.shelter_photo.url:big)
