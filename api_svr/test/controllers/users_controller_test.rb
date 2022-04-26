require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do 
      
  end
  test "Creating a new user" do
    @franchise=Franchise.new({
      "name":"TestOrg",
      "full_name":"TestOrg corp.",
      "contact_email":"bob@gmail.com",
    })
    @franchise.save()
    puts(@franchise.id)
    post '/users',params:{
      "name":"user onexx",
      "username":"useroneaa",
      "email":"userone@gmail.comb",
      "password":"123456",
      "password_confirmation":"123456",
      "franchise_id": @franchise.id
    }
    anl = JSON.parse response.body
    
    assert_response 201
  end
  test "Creating a new user password not match" do
    @franchise=Franchise.new({
      "name":"TestOrg",
      "full_name":"TestOrg corp.",
      "contact_email":"bob@gmail.com",
    })
    post '/users',params:{
      "name":"user onexx",
      "username":"useroneaa",
      "email":"userone@gmail.comb",
      "password":"123456",
      "password_confirmation":"1234567",
      "franchise_id":@franchise.id
    }
    anl = JSON.parse response.body
    
    assert_response 422
  end

end
