class Franchise < ApplicationRecord
    has_many :users
    has_many :geolayers
end
