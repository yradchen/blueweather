# == Schema Information
#
# Table name: searches
#
#  id         :integer          not null, primary key
#  long       :string           not null
#  lat        :string           not null
#  location   :text             not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date       :string
#

require 'test_helper'

class SearchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
