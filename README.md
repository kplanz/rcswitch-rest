rcswitch-rest
=============

Node.js server for controlling remote switches, e.g. using a Raspberry Pi.


Thank you https://github.com/denschu for the work! More information can be found in his blog post: https://blog.codecentric.de/en/2013/03/home-automation-with-angularjs-and-node-js-on-a-raspberry-pi


## Get the list of switches
	http://raspberrypi:8000/switches

## Turn switch on
	http://raspberrypi:8000/switches/0?status=1

## Turn switch off
	http://raspberrypi:8000/switches/0?status=0


## Get the list of groups
	http://raspberrypi:8000/groups

## Turn all switches of group on
	http://raspberrypi:8000/groups/0?status=1

## Turn all switches of group off
	http://raspberrypi:8000/groups/0?status=0
