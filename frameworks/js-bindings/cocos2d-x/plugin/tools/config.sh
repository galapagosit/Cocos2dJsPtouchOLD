#define plugins array 
export ALL_PLUGINS=("flurry" "umeng" \
"alipay" "nd91" "googleplay" \
"admob" \
"twitter" "weibo" \
"qh360" "uc")

# define the plugin root directory & publish target directory
export TARGET_DIR_NAME="publish"
if [ ! ${PLUGIN_ROOT} ]; then
    pushd ../
    export PLUGIN_ROOT=`pwd`
    popd
fi
export TARGET_ROOT=${PLUGIN_ROOT}/${TARGET_DIR_NAME}
echo PLUGIN_ROOT = ${PLUGIN_ROOT}
echo TARGET_ROOT = ${TARGET_ROOT}

# get a string include all plugins name(separate with ':')
export PLUGINS_CAN_SELECT=""
PLUGIN_NUM=${#ALL_PLUGINS[@]}
for ((i=0; i<${PLUGIN_NUM}; i++))
do
    plugin_name=${ALL_PLUGINS[$i]}
    PLUGINS_CAN_SELECT=${PLUGINS_CAN_SELECT}${plugin_name}
    if [ $i -ne $((${PLUGIN_NUM}-1)) ]; then
        PLUGINS_CAN_SELECT=${PLUGINS_CAN_SELECT}":"
    fi
done
