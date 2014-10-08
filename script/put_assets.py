#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
organize assets dir

usage: script/put_assets.py (-v <version>)

options:
    -v version
"""

import os
import shutil
import hashlib
import subprocess
import json

from docopt import docopt


# ファイル配信ディレクトリへのパス
STATIC_ROOT = '/srv/static/'
# ファイル配信URL
STATIC_URL = 'http://128.199.166.94/static/'

# マニフェストファイルパス
MANIFEST_PATH = 'res/Manifests/project.manifest'
VERSION_PATH = 'res/Manifests/version.manifest'

# cocos2d-jsのバージョン
ENGINE_VERSION = '3.0'

# 通常配信したいファイルパス
ASSETS_DIRS = ['res']
# zip圧縮で配信したいファイルパス
ZIP_ASSETS_DIRS = ['src']


def zip_assets():
    """
    zipファイルを作成
    """
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        subprocess.check_call(['zip', '-r', z_path, z_dir])

def init_manifest(version):
    """
    マニフェストファイルのベース部分
    """
    manifest = {}
    manifest['packageUrl'] = STATIC_URL
    manifest['remoteManifestUrl'] = STATIC_URL + MANIFEST_PATH
    manifest['remoteVersionUrl'] = STATIC_URL + VERSION_PATH
    manifest['version'] = version
    manifest['engineVersion'] = ENGINE_VERSION
    return manifest

def assets_md5():
    """
    通常ファイルのmd5
    """
    assets_dic = {}
    for assets_dir in ASSETS_DIRS:
        for dpath, dnames, fnames in os.walk(assets_dir):
            for fname in fnames:
                path = os.path.join(dpath, fname)
                with open(path, 'r') as f:
                    byte = f.read()
                    assets_dic[path] = {'md5': hashlib.md5(byte).hexdigest()}
    return assets_dic

def zip_assets_md5():
    """
    zipファイルのmd5
    """
    assets_dic = {}
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        with open(z_path, 'r') as f:
            byte = f.read()
            assets_dic[z_path] = {
                'md5': hashlib.md5(byte).hexdigest(),
                'compressed': True
            }
    return assets_dic

def create_manifest(version):
    """
    マニフェストファイルを出力
    """
    manifest = init_manifest(version)
    with open(VERSION_PATH, 'w') as f:
        json.dump(manifest, f, sort_keys=True, indent=2)

    manifest['assets'] = {}
    manifest['assets'].update(assets_md5())
    manifest['assets'].update(zip_assets_md5())
    with open(MANIFEST_PATH, 'w') as f:
        json.dump(manifest, f, sort_keys=True, indent=2)


def clear_static_root():
    """
    ファイル配信ディレクトリを空に
    """
    if os.path.exists(STATIC_ROOT):
        shutil.rmtree(STATIC_ROOT)
    os.mkdir(STATIC_ROOT)

def copy_assets():
    """
    通常ファイルをファイル配信ディレクトリにコピー
    """
    for assets_dir in ASSETS_DIRS:
        dst_dir = os.path.join(STATIC_ROOT + assets_dir)
        shutil.copytree(assets_dir, dst_dir)

def copy_zip_assets():
    """
    圧縮ファイルをファイル配信ディレクトリにコピー
    """
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        dst_path = os.path.join(STATIC_ROOT + z_path)
        shutil.copy(z_path, dst_path)


def main(version):
    zip_assets()

    create_manifest(version)

    clear_static_root()
    copy_assets()
    copy_zip_assets()


if __name__ == '__main__':
    args = docopt(__doc__)
    main(args['-v'])


