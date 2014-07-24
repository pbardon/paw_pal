module Api
  class DogsController < ApplicationController
    def create
      @dog = current_user.dogs.new(dog_params)

      if @dog.save
        render json: @dog
      else
        render json: @dog.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @dogs = current_user.dogs
      render json: @dogs
    end

  end
end
