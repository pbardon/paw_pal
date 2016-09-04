FactoryGirl.define do
    factory :dog do
        name 'Loki'
        size 'medium'
        description 'white fluffy dog'
        age 5

        association :owner, factory: :user, email: 'dogowner1@test.com'
    end
end




