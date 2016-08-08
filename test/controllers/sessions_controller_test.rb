require 'test_helper'

class SessionsControllerTest < ActiveSupport::TestCase
    test "should be able to create session controller" do
        sc = SessionsController.new
        assert sc
    end


    test "should be able to create a session" do
        sc = SessionsController.new
        sc.params = { session: { email: "test@test.com", password: "test1234" } }
        sc.create()
    end

end
