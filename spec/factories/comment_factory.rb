FactoryGirl.define do
    factory :comment do
        comment_date Faker::Date.backward(14)
        rating { get_random_rating }
        content Faker::Lorem.sentence(5)

        user

        factory :comment_on_dog do
            association :commentable, factory: :dog
        end

        factory :comment_on_shelter do
            association :commentable, factory: :shelter
        end
    end
end