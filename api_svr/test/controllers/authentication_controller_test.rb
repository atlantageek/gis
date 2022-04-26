require "test_helper"

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "test Login fail" do
    post '/auth/login',params:{

      "email":"userone@gmail.comb",
      "password":"123456a",
    }
    anl = JSON.parse response.body
    
    assert_response 401
  end
  test "test Login pass" do
    @franchise=Franchise.new({
      "name":"TestOrg",
      "full_name":"TestOrg corp.",
      "contact_email":"bob@gmail.com",
    })
    @franchise.save()
    
    @user = User.create({ "name":"user onexx", franchise_id: @franchise.id,
      "username":"useroneaa",
      "email":"userone@gmail.comb",
      "password":"123456",
      "password_confirmation":"123456"})
    @user.save()
    post '/auth/login',params:{

      "email":"userone@gmail.comb",
      "password":"123456",
    }
    anl = JSON.parse response.body
    
    assert_response 200
  end
  test "test Login bad password" do

    @user = User.new({      "name":"user onexx",
      "username":"useroneaa",
      "email":"userone@gmail.comb",
      "password":"123456",
      "password_confirmation":"123456"})
    @user.save()
    post '/auth/login',params:{

      "email":"userone@gmail.comb",
      "password":"123456ba",
    }
    anl = JSON.parse response.body
    
    assert_response 401
  end
end
