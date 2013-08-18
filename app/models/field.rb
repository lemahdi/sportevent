class Field < ActiveRecord::Base
	attr_accessible :street, :city, :country, :latitude, :longitude, :name
	acts_as_gmappable

	def gmaps4rails_address
		#describe how to retrieve the address from your model, if you use directly a db column, you can dry your code, see wiki
		if self.street!="" then
	  	"#{self.street}, #{self.city}, #{self.country}"
	  else
	  	"#{self.latitude},#{self.longitude}"
	  end
	end
end
