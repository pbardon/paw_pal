module Api
  class DogsController < ApiController
    def create
      @dog = current_user.dogs.new(dog_params)

      if @dog.save
        render json: @dog
      else
        render jsonL @dog.errors.full_messages, status: :unporcessable_entity
      end
    end

    def index
      @dogs = current_user.dogs
      render json: @dogs
    end

  end
end
