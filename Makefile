OUT=out

NAME=$(jq -rM ".name" package.json)
VERSION=$(jq -rM ".version" package.json | cut -c 2-)
PACKAGE=$(NAME)-$(VERSION).tgz
SOURCE_FILES=$(wildcard src/*ts)

STAMP_TEST=$(OUT)/stamp-test
STAMP_SETUP=$(OUT)/stamp-setup
STAMP_COMPILE=$(OUT)/stamp-compile

$(STAMP_SETUP): package.json | $(OUT)
	npm i
	touch $@

$(STAMP_COMPILE): $(SOURCE_FILES) $(STAMP_SETUP) | $(OUT)
	node_modules/.bin/tsc
	touch $@

$(STAMP_TEST): $(STAMP_COMPILE) | $(OUT)
	npm test
	touch $@

test: $(STAMP_TEST)

$(PACKAGE): $(STAMP_TEST)
	npm pack

package: $(PACKAGE)

$(OUT):
	mkdir -p $@

publish: $(PACKAGE)

clean:
	rm -rf lib node_modules out $(NAME)*.tgz

.PHONY: clean publish package est
