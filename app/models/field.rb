class Field < ActiveRecord::Base
	attr_accessible :street, :city, :country, :latitude, :longitude, :name, :timezone

	before_save :set_timezone

	validates :city, presence: true
	validates :country, presence: true
	validates :latitude, presence: true
	validates :longitude, presence: true
	validates :name, presence: true

	private
		def set_timezone
      self.timezone = timezone_object(self).time_zone_id
		end
end
