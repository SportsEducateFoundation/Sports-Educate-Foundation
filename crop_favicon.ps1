
Add-Type -AssemblyName System.Drawing
$imagePath = "d:\Backup 11.10.25\Documents\Sportseducate website\Sports Educate Foundation\public\favicon.png"
$outputPath = "d:\Backup 11.10.25\Documents\Sportseducate website\Sports Educate Foundation\public\favicon-square.png"

$src = [System.Drawing.Bitmap]::FromFile($imagePath)
$width = $src.Width
$height = $src.Height

# We want to find the bounding box of non-white/non-transparent pixels
# Since it's a favicon, we want the "icon" part.
# Let's just crop the top-center part more aggressively.
$cropWidth = [int]($width * 0.45) # The icon is usually smaller than the full width
$cropHeight = [int]($height * 0.65) # The icon is in the top 65%
$size = [Math]::Min($cropWidth, $cropHeight)

$x = [int](($width - $size) / 2)
$y = [int]($height * 0.05) # Small padding from top

$dest = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::White) # Ensure white background

$srcRect = New-Object System.Drawing.Rectangle($x, $y, $size, $size)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$dest.Dispose()
$src.Dispose()

Write-Host "Success: Tighter square favicon saved to $outputPath"
