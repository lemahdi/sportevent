class Field < ActiveRecord::Base
	attr_accessible :street, :city, :country, :latitude, :longitude, :name, :timezone
	
	geocoded_by :address

	before_save :set_timezone

	validates :street, presence: true, if: "!city.empty? || !country.empty?"
	validates :city, presence: true, if: "!street.empty? || !country.empty?"
	validates :country, presence: true, if: "!street.empty? || !city.empty?"
	validates :latitude, presence: true, if: "!longitude.nil?"
	validates :longitude, presence: true, if: "!latitude.nil?"
	validates :name, presence: true

	after_validation :geocode

	private
		def set_timezone
      self.timezone = timezone_object(self).time_zone_id
		end

		def address
			"#{street}, #{city}, #{country}" if !street.empty? && !city.empty? && !country.empty?
		end
end
