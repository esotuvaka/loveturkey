# Loveturkey random airport finder

A random airport finder for travel agencies in Turkey to use and create ideas for vacations / holidays.

## React + React-Three-Fiber Frontend, PHP Backend, MySQL Database

This was my first exposure to building with 3D elements in the browser. I had fun learning about texture mapping, point vs ambient lighting, and manipulating the z axis.

To take this project to the next level I'd need a higher quality Earth texture map, and could combine it with spectral and normal maps to make it photo-realistic, but that would be an artistic choice (and loading high-res textures is bad for performance).

I struggled with getting the coordinate system to work properly as it manipulates a pin mesh independently of the position of the Earth. Remembering longitude vs latitude and the conversions to and from Radians was also a headache at times.

## Ideas

- Convert calculations done on frontend to be done on the backend

## Changelog

### 11/12/2022

- Project 90% complete
- Button to find a random airport
- Earth rotates under a pin that shows an airport location
- UI displays the airport's info
- Replaced 8k textures with simplistic, stylized Earth texture map with higher color contrast and softer edges

### 11/10/2022

- Project started
- React-Three-Fiber environment created and sphere placed into scene successfully
- Mapped 8k texture, normal, and spectral maps to the sphere for a photo-real earth (subject to change)
