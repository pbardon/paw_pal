FactoryGirl.define do
    factory :user do
        email 'jimbolahey2@sunnyvale.com'
        name 'Jimbo Lahey'
        session_token User.generate_session_token
        password 'hello_world'
    end
end