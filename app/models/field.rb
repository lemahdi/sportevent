class Field < ActiveRecord::Base
	attr_accessible :street, :city, :country, :latitude, :longitude, :name, :timezone

	before_save :set_timezone

	validates :city, presence: true
	validates :country, presence: true
	validates :latitude, presence: true
	validates :longitude, presence: true
	validates :name, presence: true

	acts_as_gmappable process_geocoding: false

	#describe how to retrieve the address from your model, if you use directly a db column, you can dry your code, see wiki
	def gmaps4rails_address
		"#{self.latitude},#{self.longitude}"
	end

	private
		def set_timezone
      self.timezone = timezone_object(self).time_zone_id
		end
end
