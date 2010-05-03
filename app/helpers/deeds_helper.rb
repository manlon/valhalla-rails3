module DeedsHelper
  def deeds_json
    @deeds.collect do |d|
      {
        'id' => d.id,
        'speaker' => d.speaker,
        'text' => d.text,
        'performed_at' => d.performed_at.to_i
      }
    end.to_json.gsub("</script>", "\\<\\/script\\>")
  end
end
