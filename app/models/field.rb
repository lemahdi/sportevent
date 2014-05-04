class Field < ActiveRecord::Base
	attr_accessible :street, :city, :country, :latitude, :longitude, :name, :timezone
	
	geocoded_by :address
	reverse_geocoded_by :latitude, :longitude

	before_save :set_timezone

	validates :latitude, presence: true
	validates :longitude, presence: true
	validates :name, presence: true

	after_validation :geocode, if: :address_changed?
	after_validation :reverse_geocode

	private
		def set_timezone
      self.timezone = GoogleTimezone.fetch(self.latitude, self.longitude).time_zone_id#timezone_object(self).time_zone_id
		end

		def address
			print_field(self) if !street.empty? && !city.empty? && !country.empty?
		end

		def address=(add)
			add_split = add.split(",")
			add_split.each do |as|
				as.gsub!(/^ */, "").gsub!(/ *$/, "")
			end

			self.street = add_split[0] if add_split.size > 0
			self.city = add_split[1] if add_split.size > 1
			self.country = add_split[2] if add_split.size > 2

			if self.city
				mt = self.city.match(/[0-9]+/)
				if !mt.nil?
					self.street += ", " + mt[0]
					self.city.gsub!(/[0-9]+/, "")
				end
			end
		end

		def address_changed?
			street.present? && city.present? && country.present? &&
			street_changed? && city_changed? && country_changed?
		end
end
