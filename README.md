# vimperator - wenxuecity

vimperator-wenxuecity is a [firfox][1] [vimperator][2] plugin for auto-loading content from www.wenxuecity.com. 

If you are as lazy as I am, and you are a regular reader of the wenxuecity website, this is the right plugin for you. With a single command, you can load all the pages you want to read. It is highly customizable. In addtions, it removes the Ads, commercials, make the page easier to read.

[1]: http://www.mozilla.org/en-US/firefox/
[2]: http://vimperator.org/vimperator

# Installation
I'm supposing you already have [Firefox][1] installed, and know how to install [vimperator][2] (it's very easy, it takes just several seconds).

For Windows system:

    Copy `wenxuecity.js` to `%HOME%\vimperator\plugin` directory

For Linux or Mac OS X:

    Copy `wenxuecity.js` to `~/.vimperator/plugin/` directory
    
Next you can start your firefox. Then type:

    :wen

Now firefox will automatically load all the today's news. Happy surfing!

# Configuration

The configuration is done in `.vimperatorrc` if you are on linux or Mac OS X. But you can totally skip the configuration, you can do it by the command. 

 * `liberator.globalVariables.wenxuecity_forums=news ent` sets the default forums you want to load. 

# Usage

Simply type command `:wen`. You can now with all pages loaded automatically.
TODO list the options

## Advanced usage

You may also use the options to automate what forum you want to read. Here's how.

 `:wen`
 then press space key, you will see options:
 `-date` and `-forum`
 then you can choose either of them, e.g.
 `-f`
 if you press space, you will gets all the options for available forums:


# Bugs, Feature Requests, etc. 

 * [Source][3]
 * [Issue tracker][4]

[3]: http://github.com/zhhz/vimperator-wenxuecity
[4]: http://github.com/zhhz/vimperator-wenxuecity/issues

# Todos

 * scripts for installing the plugin
 * more options for other forums
 
# Notes
 
 This plugin is depends on the design of www.wenxuecity.com. When they change their structure, it might break this plugin, but as you might understand, the code is pretty straight forward, you should be able to modify the code to accomplish the changes. On the other hand, I will be keeping an eye on the site, and maintenance this plugin regularly to make sure it is working

# License

    Copyright (c) 2011 Zhonghai Zuo
    
    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
    
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


