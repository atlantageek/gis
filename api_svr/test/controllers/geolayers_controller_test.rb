require "test_helper"

class GeolayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @franchise2=Franchise.new({
      "name":"TestOrg2",
      "full_name":"TestOrg corp.",
      "contact_email":"bob@gmail.com",
    })
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
  end

  test "Create GeoLayer" do
    post '/auth/login',params:{

      "email":"userone@gmail.comb",
      "password":"123456",
    }
    anl = JSON.parse response.body
    assert_response 200
    assert true
    assert @user.franchise.name == "TestOrg"

    post '/geolayers', params:{
      "enabled":true,
      "name":"ALayer",
      "layer_type":"WMS",
      "source":"here",
      "uri":"http://www.google.com",
      "franchise_id": @franchise.id
    }
    anl = JSON.parse response.body
    
    assert_response 200
  end
end
