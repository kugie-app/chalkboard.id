import { List } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'

const NestedTypo = () => {
  return (
    <div>
       <CardBox>
            <h4 className="text-lg font-semibold">Nested</h4>
            <List>
              <List.Item>
                List item one
                <List ordered nested>
                  <List.Item>
                    You might feel like you are being really "organized" o
                  </List.Item>
                  <List.Item>
                    Nested navigation in UIs is a bad idea too, keep things as
                    flat as possible.
                  </List.Item>
                  <List.Item>
                    Nesting tons of folders in your source code is also not
                    helpful.
                  </List.Item>
                </List>
              </List.Item>
              <List.Item>
                List item two
                <List ordered nested>
                  <List.Item>
                    I'm not sure if we'll bother styling more than two levels
                    deep.
                  </List.Item>
                  <List.Item>
                    Two is already too much, three is guaranteed to be a bad
                    idea.
                  </List.Item>
                  <List.Item>
                    If you nest four levels deep you belong in prison.
                  </List.Item>
                </List>
              </List.Item>
              <List.Item>
                List item three
                <List ordered nested>
                  <List.Item>
                    Again please don't nest lists if you want
                  </List.Item>
                  <List.Item>Nobody wants to look at this.</List.Item>
                  <List.Item>
                    I'm upset that we even have to bother styling this.
                  </List.Item>
                </List>
              </List.Item>
            </List>
          </CardBox>
    </div>
  )
}

export default NestedTypo
