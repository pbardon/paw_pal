FactoryGirl.define do

    factory :shelter do
        avg_rating { get_random_rating }
        shelter_name Faker::Company.name
        description Faker::Lorem.sentence(5)
        street_address Faker::Address.street_address
        city Faker::Address.city
        zipcode Faker::Address.zip_code
        state Faker::Address.state_abbr
        price 300
        user


        trait :with_photo do
            shelter_photo { sample_file('dog2.jpeg') }
        end

        trait :with_comments do
            after(:create) do |shelter|
                create(:comment_on_shelter, commentable: shelter)
            end
        end
    end
end