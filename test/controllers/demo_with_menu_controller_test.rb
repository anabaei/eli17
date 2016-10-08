require 'test_helper'

class DemoWithMenuControllerTest < ActionController::TestCase
  test "should get java" do
    get :java
    assert_response :success
  end

end
