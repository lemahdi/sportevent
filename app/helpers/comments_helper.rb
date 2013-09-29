module CommentsHelper
	def playing_user?(match, user)
		match.users.include?(user)
	end
end
