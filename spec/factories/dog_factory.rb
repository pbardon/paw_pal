FactoryGirl.define do
    factory :dog do
        name Faker::Name.first_name
        size %w(small medium large).sample
        description Faker::Lorem.sentence(5)
        age (1..15).to_a.sample

        association :owner, factory: :user

        factory :dog_with_photo do
            dog_photo { sample_file('dog1.jpeg') }
        end

        factory :dog_with_comments do
            transient do
                comment_count 5
            end

            after(:create) do |dog, evaluator|
                create_list(:comment, evaluator.comment_count, commentable: dog, user: dog.owner)
            end
        end

    end
end




