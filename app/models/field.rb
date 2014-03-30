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

	after_validation :geocode, if: :address_changed?

	private
		def set_timezone
      self.timezone = timezone_object(self).time_zone_id
		end

		def address
			"#{street}, #{city}, #{country}" if !street.empty? && !city.empty? && !country.empty?
		end

		def address_changed?
			street.present? && city.present? && country.present? &&
			street_changed? && city_changed? && country_changed?
		end
end
