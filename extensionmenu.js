'use strict';

/**
 * extension hue-lights menu
 * JavaScript Gnome extension for Philips Hue bridges - Menu creator.
 *
 * @author Václav Chlumský
 * @copyright Copyright 2020, Václav Chlumský.
 */

 /**
 * @license
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Václav Chlumský
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Hue = Me.imports.phue;
const Utils = Me.imports.utils;
const Util = imports.misc.util;
const Gettext = imports.gettext;
const _ = Gettext.gettext;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;

var PhueMenu = GObject.registerClass({
     GTypeName: 'PhueMenu'
    },
    class PhueMenu extends PanelMenu.Button {
        _init() {
            super._init(0.0, Me.metadata.name, false);

            this.hue = new Hue.Phue();
            this.hue.bridges = Utils.readBridges();
            this.hue.checkBridges();
            Utils.writeBridges(this.hue.bridges);
            log(JSON.stringify(Utils.readBridges()));

            for (let bridgeid in this.hue.instances) {
                //log(JSON.stringify(this.hue.instances[bridgeid].setLights([12, 21], {"on":true, "sat":254, "bri":254,"hue":10000})));
            }


            Main.notify('Example Notification', 'Hello World !');

            let icon = new St.Icon({
                gicon : Gio.icon_new_for_string(Me.dir.get_path() + '/media/devicesBridgesV2white.svg'),
                style_class : 'system-status-icon',
              });
            this.add_child(icon);

            let menuItem = new PopupMenu.PopupMenuItem('Menu Item');
            menuItem.add_child(new St.Label({text : 'Label added to the end'}));
            menuItem.connect('button-press-event', function(){ Main.notify('Example Notification', 'Hello World !'); });

            this.menu.addMenuItem(menuItem);

            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

            let prefsMenuItem = new PopupMenu.PopupMenuItem(_("Settings"));
            prefsMenuItem.connect('button-press-event', function(){ Util.spawn(["gnome-shell-extension-prefs", Me.uuid]); });
            this.menu.addMenuItem(prefsMenuItem);
    }
});