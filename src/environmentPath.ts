"use strict";
import * as vscode from 'vscode';
import * as path from 'path';

export class Environment {

    private context: vscode.ExtensionContext;
    public isInsiders = null;
    public homeDir = null;
    public ExtensionFolder: string = null;
    public PATH = null;

    public FILE_SETTING: string = null;
    public FILE_LAUNCH: string = null;
    public FILE_KEYBINDING: string = null;
    public FILE_LOCALE : string = null;
    public FILE_SETTING_NAME: string = "settings.json";
    public FILE_LAUNCH_NAME: string = "launch.json";
    public FILE_KEYBINDING_NAME: string = "keybindings.json";
    public FILE_EXTENSION_NAME : string = "extensions.json";
    public FILE_LOCALE_NAME : string = "locale.json";
    public FILE_EXTENSION : string = null;
    public FOLDER_SNIPPETS: string = null;
    public APP_SETTINGS : string = null;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.isInsiders = /insiders/.test(context.asAbsolutePath(""));
        this.homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
        this.ExtensionFolder = path.join(this.homeDir, this.isInsiders ? '.vscode-insiders' : '.vscode', 'extensions');

        this.PATH = process.env.APPDATA
        if (!this.PATH) {
            if (process.platform == 'darwin')
                this.PATH = process.env.HOME + '/Library/Application Support';
            else if (process.platform == 'linux') {
                var os = require("os")
                this.PATH = os.homedir() + '/.config';
            } else
                this.PATH = '/var/local'
        }

        var codePath = this.isInsiders ? '/Code - Insiders' : '/Code';
        this.PATH = this.PATH + codePath;

        this.FILE_EXTENSION = this.PATH.concat("/User/",this.FILE_EXTENSION_NAME);
        this.FILE_SETTING = this.PATH.concat("/User/",this.FILE_SETTING_NAME);
        this.FILE_LAUNCH = this.PATH.concat("/User/",this.FILE_LAUNCH_NAME);
        this.FILE_KEYBINDING = this.PATH.concat("/User/",this.FILE_KEYBINDING_NAME);
        this.FILE_LOCALE = this.PATH.concat("/User/",this.FILE_LOCALE_NAME);
        this.FOLDER_SNIPPETS = this.PATH.concat("/User/snippets/");
        this.APP_SETTINGS = this.PATH.concat("/User/syncSettings.json");
    }


}