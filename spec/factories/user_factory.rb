FactoryGirl.define do
    factory :user do
        sequence(:email) { |n| "person#{n}@example.com" }
        name Faker::Name.name
        session_token User.generate_session_token
        password Faker::Internet.password

        factory :user_with_dogs do
            transient do
                dog_count 5
            end

            after(:create) do |user, evaluator|
                create_list(:dog, evaluator.dog_count, owner: user)
            end
        end

        factory :user_with_shelter_account do
            after(:create) do |user|
                create(:shelter, user: user)
            end
        end
    end
end