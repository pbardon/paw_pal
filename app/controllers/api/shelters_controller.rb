require 'addressable/uri'
require 'rest-client'
require 'nokogiri'
require 'json'

module Api

  class SheltersController < ApplicationController
    attr_reader :user_id

    wrap_parameters :shelter, include: [:shelter_name, :price, :description, :street_address,
                                       :city, :state, :zipcode, :small, :medium, :large, :shelter_photo]


    def create
      @shelter = Shelter.new(shelter_params)
      @shelter.user_id = current_user.id
      if @shelter.save
        geo = generate_geocode(@shelter.street_address, @shelter.zipcode, @shelter.city, @shelter.state)
        @shelter.latitude = geo[0]
        @shelter.longitude = geo[1]
        @shelter.save!
        render 'shelters/show'
      else
        render json: @shelter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @shelters = Shelter.all
      render "shelters/index"
    end

    def update
      @shelter = Shelter.find(params[:id])

      if @shelter.user_id == 1
        render json: "Can't Modify Guest Account", status: :unprocessable_entity
        return
      end

      if @shelter.user_id == current_user.id && @shelter.update_attributes(shelter_params)
        geo = generate_geocode(@shelter.street_address, @shelter.zipcode, @shelter.city, @shelter.state)
        @shelter.latitude = geo[0]
        @shelter.longitude = geo[1]
        @shelter.save!
        render "shelters/show"
      else
        render json: @shelter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @shelter = Shelter.find(params[:id])
      if @shelter
        i = 0
        sum = 0
        @shelter.comments.each do |comment|
          sum += comment.rating
          i += 1
        end
        @shelter.avg_rating = sum/i unless i == 0
        @shelter.save
      end

      @current_user = current_user

      render "shelters/show"
    end

    def destroy
      debugger
      @shelter = Shelter.find(params[:id])

      if @shelter.user_id == 1
        render json: "Can't Modify Guest Account", status: :unprocessable_entity
        return
      end

      if @shelter.user_id == current_user.id && @shelter.destroy
        render "shelters/show"
      else
        render json: "Can't destroy some else's shelter profile"
      end
    end

    private

    def shelter_params
      params.require(:shelter).permit(:shelter_name, :description, :price,
                                     :small, :medium, :large,
                                     :street_address, :city, :state, :zipcode, :shelter_photo)
    end

    def generate_geocode(street_address, zipcode, city, state)
      coords = []
      address = street_address.to_s + ", " + city.to_s + ", " + state.to_s + " " + zipcode.to_s

      geolocationaddress = Addressable::URI.new(
        scheme: 'http',
        host: 'maps.googleapis.com',
        path: 'maps/api/geocode/json',
        query_values: {address: address}
      ).to_s

      output = JSON.parse(RestClient.get(geolocationaddress))
      results = output["results"].first
      location = results['geometry']['location']

      coords.push(location['lat'])
      coords.push(location['lng'])
      coords
    end

  end

end
