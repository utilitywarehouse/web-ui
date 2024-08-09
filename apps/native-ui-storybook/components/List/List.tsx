import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemTrailingIcon,
} from '@utilitywarehouse/native-ui';
import React from 'react';
import * as Icons from '@utilitywarehouse/react-native-icons';
import { StoryFn } from '@storybook/react';
import _ from 'lodash';

const ListBasic: StoryFn = ({
  container,
  headingText,
  headingSupportingText,
  _listItemText,
  _listItemSupportingText,
  _listItemLeadingContent: _icon,
  _listItemTrailingContent: _trailingIcon,
  divider,
  _listItemOnPress,
  disabled,
  loading,
  _numberOfItems,
}: any) => {
  // @ts-expect-error - This is a playground
  const icon = _icon === 'none' ? undefined : Icons[_icon];
  // @ts-expect-error - This is a playground
  const trailingIcon = _trailingIcon === 'none' ? undefined : Icons[_trailingIcon];
  const handlePress = _listItemOnPress === 'null' ? undefined : eval(_listItemOnPress);
  const listItems = Array.from({ length: _numberOfItems }).map((_, index) => (
    <ListItem
      key={index}
      text={_listItemText}
      supportingText={_listItemSupportingText}
      onPress={handlePress}
      leadingContent={icon && <ListItemIcon as={icon} />}
      trailingContent={trailingIcon ? <ListItemTrailingIcon as={trailingIcon} /> : null}
      divider={container === 'full' ? divider : divider && index !== _numberOfItems - 1}
    />
  ));
  return (
    <List
      container={container}
      disabled={disabled}
      loading={loading}
      headingText={headingText}
      headingSupportingText={headingSupportingText}
    >
      {container === 'card' && (
        <Box borderRadius="$xl" backgroundColor="$grey50" $dark-bg="$darkGrey50">
          {listItems}
        </Box>
      )}
      {container === 'full' && listItems}
    </List>
  );
};

ListBasic.argTypes = {
  container: {
    options: ['full', 'card'],
    control: 'select',
    description: 'The container variant to be displayed on the list.',
  },
  headingText: {
    control: 'text',
    description:
      'The heading text to be displayed on the list. \n _Note: This is a playground prop, use title on the ListHeading component._',
  },
  headingSupportingText: {
    control: 'text',
    description:
      'The heading supporting text to be displayed on the list. \n _Note: This is a playground prop, use _listItemSupportingText on the ListHeading component._',
  },
  _listItemText: {
    control: 'text',
    description:
      'The text to be displayed on the list item. \n _Note: This is a playground prop. Use the text prop on the ListItem component._',
  },
  _listItemSupportingText: {
    control: 'text',
    description:
      'The supporting text to be displayed on the list item. \n _Note: This is a playground prop. Use the supportingText prop on the ListItem component._',
  },
  _listItemLeadingContent: {
    options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
    control: 'select',
    description:
      'The leading content to be displayed on the list item.\n _Note: This is a playground prop. Use the leadingContent prop on the ListItem component._',
  },
  _listItemTrailingContent: {
    options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
    control: 'select',
    description:
      'The trailing content to be displayed on the list item.\n _Note: This is a playground prop. Use the trailingText prop on the ListItem component._',
  },
  _listItemOnPress: {
    options: ["() => console.log('List item pressed')", 'null'],
    control: 'select',
    description:
      'The function to be called when the list item is pressed. \n _Note: This is a playground prop. Use the onPress prop on the ListItem component._',
  },
  divider: {
    control: 'boolean',
    description: 'Whether to display a divider below the list item.',
  },
  disabled: {
    control: 'boolean',
    description: 'Whether the list item is disabled.',
  },
  loading: {
    control: 'boolean',
    description: 'Whether the list item is in a loading state.',
  },
  _numberOfItems: {
    control: 'number',
    description: 'The number of list items to display. \n _Note: This is a playground prop._',
  },
};

ListBasic.args = {
  container: 'full',
  headingText: 'This is the list heading',
  headingSupportingText: 'Supporting text',
  divider: true,
  disabled: false,
  loading: false,
  _listItemText: 'List item text',
  _listItemSupportingText: 'Supporting text',
  _listItemLeadingContent: 'SettingsMediumIcon',
  _listItemTrailingContent: 'none',
  _listItemOnPress: "() => console.log('List item pressed')",
  _numberOfItems: 4,
};

export default ListBasic;

export { IconButton };