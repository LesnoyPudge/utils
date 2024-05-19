import { createElement } from "./createElement";



describe('createElement', () => {
    // test('1', () => {
    //     const el = createElement('a', { href: 'example.com', dataset: {s: ''}  });

    //     expect(el.href.includes('example.com')).toBe(true)
    // })

    // test('2', () => {
    //     const el = createElement('div', {
    //         children: [
    //             createElement('a', { 
    //                 href: 'example.com',
                    
    //             }, {
    //                 ['data-custom']: 'custom data',
    //             })
    //         ]
    //     });
        
    //     const link = el.childNodes.item(0);
    //     const withProps = (
    //         'tagName' in link && 
    //         'href' in link && 
    //         'dataset' in link
    //     );

    //     const isValid = (
    //         withProps && 
    //         link.tagName === 'A' &&
    //         typeof link.href === 'string' &&
    //         link.href.includes('example.com') &&
    //         (link as HTMLAnchorElement).dataset.custom === 'custom data'
    //     )

    //     expect(isValid).toBe(true)
    // })
})