FactoryGirl.define do
    factory :user do
        sequence(:email) do |n|
            email = Faker::Internet.email
            at_index = email.index('@')
            email = email.insert(at_index, n.to_s)
            "#{email}"
        end
        sequence(:name) { |n | "#{Faker::Name.name} # #{n}" }
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