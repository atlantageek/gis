# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

main_franchise=Franchise.create([{name:'NodeHealth',full_name: 'Node Health Inc', contact_email: 'admin@nodehealth.com'}])
main_franchise[0].users.create([{name:'Tommie Jones',username:'tommie', email:'admin@nodehealth.com',
    password:'fdsajkl;',password_confirmation:'fdsajkl;'}])
